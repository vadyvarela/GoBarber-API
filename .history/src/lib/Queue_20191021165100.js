import Bee from 'bee-queue';
import CancellationMail from '../app/jobs/cancellationMails'

const jobs = [CancellationMail];

class Queue {
  constructor() {
    this.queues = {};

    this.init(){

    }
  }

  init() {

  }
}

export default new Queue();
