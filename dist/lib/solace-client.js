import {connectedToSolace} from "./store/store.js";
import {solaceConfig} from "../config/config.js";
import solace from "../../_snowpack/pkg/solclientjs.js";
import {log} from "./logger.js";
class SubscriptionObject {
  constructor(_callback, _isSubscribed) {
    this.callback = _callback;
    this.isSubscribed = _isSubscribed;
  }
}
class QueueConsumerObject {
  constructor(messageConsumer, isConsuming) {
    this.messageConsumer = messageConsumer;
    this.isConsuming = isConsuming;
  }
}
export class SolaceClient {
  constructor() {
    this.session = null;
    this.topicSubscriptions = new Map();
    this.queueSubscriptions = new Map();
    let factoryProps = new solace.SolclientFactoryProperties();
    factoryProps.profile = solace.SolclientFactoryProfiles.version10;
    solace.SolclientFactory.init(factoryProps);
  }
  async connect() {
    return new Promise((resolve, reject) => {
      if (this.session !== null) {
        log.warn("Already connected and ready to subscribe.");
        reject();
      }
      try {
        if (solaceConfig.solace_hostUrl.indexOf("ws") != 0) {
          reject("HostUrl must be the WebMessaging Endpoint that begins with either ws:// or wss://. Please check your game-config.ts!");
        }
        this.session = solace.SolclientFactory.createSession({
          url: solaceConfig.solace_hostUrl,
          vpnName: solaceConfig.solace_vpn,
          userName: solaceConfig.solace_userName,
          password: solaceConfig.solace_password,
          connectRetries: 3,
          publisherProperties: {
            enabled: true,
            acknowledgeMode: solace.MessagePublisherAcknowledgeMode.PER_MESSAGE
          }
        });
      } catch (error) {
        log.error(error.toString());
      }
      this.session.on(solace.SessionEventCode.UP_NOTICE, (sessionEvent) => {
        log.info("=== Successfully connected and ready to subscribe. ===");
        connectedToSolace.set(true);
        resolve("Connected");
      });
      this.session.on(solace.SessionEventCode.CONNECT_FAILED_ERROR, (sessionEvent) => {
        log.error("Connection failed to the message router: " + sessionEvent.infoStr + " - check correct parameter values and connectivity!");
        reject(`Check the settings in game-config.ts and try again!`);
      });
      this.session.on(solace.SessionEventCode.DISCONNECTED, (sessionEvent) => {
        log.info("Disconnected.");
        if (this.session !== null) {
          this.session.dispose();
          this.session = null;
        }
        connectedToSolace.set(false);
      });
      this.session.on(solace.SessionEventCode.ACKNOWLEDGED_MESSAGE, (sessionEvent) => {
        log.info("Delivery of message with correlation key = " + sessionEvent.correlationKey + " confirmed.");
      });
      this.session.on(solace.SessionEventCode.REJECTED_MESSAGE_ERROR, (sessionEvent) => {
        log.info("Delivery of message with correlation key = " + sessionEvent.correlationKey + " rejected, info: " + sessionEvent.infoStr);
      });
      this.session.on(solace.SessionEventCode.SUBSCRIPTION_ERROR, (sessionEvent) => {
        log.info("Cannot subscribe to topic: " + sessionEvent.correlationKey);
        this.topicSubscriptions.delete(String(sessionEvent.correlationKey));
      });
      this.session.on(solace.SessionEventCode.SUBSCRIPTION_OK, (sessionEvent) => {
        log.info(`Session co-relation-key for event: ${sessionEvent.correlationKey}`);
        let topicStr = String(sessionEvent.correlationKey);
        if (this.topicSubscriptions.get(topicStr)) {
          if (this.topicSubscriptions.get(topicStr).isSubscribed) {
            this.topicSubscriptions.delete(topicStr);
            log.info(`Successfully unsubscribed from topic: ${sessionEvent.correlationKey}`);
          } else {
            this.topicSubscriptions.get(topicStr).isSubscribed = true;
            log.info(`Successfully subscribed to topic: ${sessionEvent.correlationKey}`);
          }
        }
      });
      this.session.on(solace.SessionEventCode.MESSAGE, (message) => {
        let topicName = message.getDestination().getName();
        for (let sub of Array.from(this.topicSubscriptions.keys())) {
          let regexdSub = sub.replace(/\*/g, ".*");
          if (sub.lastIndexOf(">") == sub.length - 1)
            regexdSub = regexdSub.substring(0, regexdSub.length - 1).concat(".*");
          let matched = topicName.match(regexdSub);
          if (matched && matched.index == 0) {
            if (regexdSub.lastIndexOf("*") == sub.length - 1) {
              if (regexdSub.split("/").length != topicName.split("/").length)
                return;
            }
            if (this.topicSubscriptions.get(sub).isSubscribed && this.topicSubscriptions.get(sub).callback != null) {
              log.debug(`Got callback for ${sub}`);
              this.topicSubscriptions.get(sub).callback(message);
            }
          }
        }
      });
      try {
        this.session.connect();
      } catch (error) {
        log.info(error.toString());
      }
    });
  }
  disconnect() {
    log.info("Disconnecting from Solace message router...");
    if (this.session !== null) {
      try {
        this.session.disconnect();
      } catch (error) {
        log.error(error.toString());
      }
    } else {
      log.error("Not connected to Solace message router.");
    }
  }
  unsubscribe(topicName) {
    if (!this.session) {
      log.warn("[WARNING] Cannot subscribe because not connected to Solace message router!");
      return;
    }
    log.info(`Unsubscribing from ${topicName}...`);
    this.session.unsubscribe(solace.SolclientFactory.createTopicDestination(topicName.toString()), true, topicName, 1e3);
  }
  subscribe(topicName, callback) {
    if (!this.session) {
      log.warn("Cannot subscribe because not connected to Solace message router!");
      return;
    }
    if (this.topicSubscriptions.get(topicName)) {
      log.warn(`Already subscribed to ${topicName}.`);
      return;
    }
    log.info(`Subscribing to ${topicName}`);
    let subscriptionObject = new SubscriptionObject(callback, false);
    this.topicSubscriptions.set(topicName, subscriptionObject);
    try {
      this.session.subscribe(solace.SolclientFactory.createTopicDestination(topicName.toString()), true, topicName, 1e4);
    } catch (error) {
      log.error(error.toString());
    }
  }
  consumeFromQueue(queueName, callback) {
    if (this.session == null) {
      log.error("Not connected to Solace!");
    } else {
      if (this.queueSubscriptions.get(queueName).isConsuming)
        log.warn("Already connected to the queue");
      else {
        let messageConsumer = this.session.createMessageConsumer({
          queueDescriptor: {name: queueName, type: solace.QueueType.QUEUE},
          acknowledgeMode: solace.MessageConsumerAcknowledgeMode.CLIENT
        });
        let queueConsumerObject = new QueueConsumerObject(messageConsumer, false);
        this.queueSubscriptions.set(queueName, queueConsumerObject);
        messageConsumer.on(solace.MessageConsumerEventName.UP, () => {
          queueConsumerObject.isConsuming = true;
          log.info("Succesfully connected to an consuming from " + queueName);
        });
        messageConsumer.on(solace.MessageConsumerEventName.CONNECT_FAILED_ERROR, () => {
          queueConsumerObject.isConsuming = false;
          log.error("Consumer cannot bind to queue " + queueName);
        });
        messageConsumer.on(solace.MessageConsumerEventName.DOWN, () => {
          queueConsumerObject.isConsuming = false;
          log.error("The message consumer is down");
        });
        messageConsumer.on(solace.MessageConsumerEventName.DOWN_ERROR, () => {
          queueConsumerObject.isConsuming = false;
          log.error("An error happend, the message consumer is down");
        });
        messageConsumer.on(solace.MessageConsumerEventName.MESSAGE, (message) => {
          callback(message);
          message.acknowledge();
        });
        try {
          messageConsumer.connect();
        } catch (err) {
          log.error("Cannot start the message consumer on queue " + queueName + " because: " + err);
        }
      }
    }
  }
  stopConsumeFromQueue(queueName) {
    if (this.queueSubscriptions.get(queueName) == null) {
      log.error(queueName + " is currently not being subscribed to");
    } else {
      if (this.queueSubscriptions.get(queueName).isConsuming) {
        this.queueSubscriptions.get(queueName).messageConsumer.stop();
        this.queueSubscriptions.get(queueName).isConsuming = false;
      }
    }
  }
  sendRequest(topic, payload, deliveryMode, callback) {
    if (!this.session) {
      log.warn("[WARNING] Cannot publish because not connected to Solace message router!");
      return;
    }
    const binaryAttachment = new Blob([payload], {type: "text/plain; charset=utf-8"}).arrayBuffer();
    log.info(`Publishing request message ${payload} to topic ${topic}...`);
    let message = solace.SolclientFactory.createMessage();
    message.setDestination(solace.SolclientFactory.createTopicDestination(topic));
    binaryAttachment.then((buffer) => {
      message.setBinaryAttachment(new Uint8Array(buffer));
      message.setDeliveryMode(deliveryMode);
      try {
        this.session.sendRequest(message, 2e3, (session, msg) => {
          const blob = new Blob([msg.getBinaryAttachment()], {type: "text/plain; charset=utf-8"});
          blob.text().then((text) => {
            callback(text);
          }), (session2, error) => {
            log.error(error);
          };
        });
      } catch (error) {
        log.error(error);
      }
    });
  }
  publishToTopic(topic, payload, deliveryMode) {
    if (!this.session) {
      log.warn("[WARNING] Cannot publish because not connected to Solace message router!");
      return;
    }
    const binaryAttachment = new Blob([payload], {type: "text/plain; charset=utf-8"}).arrayBuffer();
    log.debug(`Publishing message ${payload} to topic ${topic}...`);
    let message = solace.SolclientFactory.createMessage();
    message.setDestination(solace.SolclientFactory.createTopicDestination(topic));
    binaryAttachment.then((buffer) => {
      message.setBinaryAttachment(new Uint8Array(buffer));
      message.setDeliveryMode(deliveryMode);
      try {
        this.session.send(message);
        log.debug("Message published.");
      } catch (error) {
        log.info(error.toString());
      }
    });
  }
}
export const SOLACE_CLIENT_CONTEXT_KEY = {};
