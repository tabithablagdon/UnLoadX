import cmd from 'node-cmd';

/**
 * function runSiege - runs siege test and logs response time for each request in siegelog.txt
 *
 * @param  {[INTEGER]} volume [number of concurrent users]
 */

const loadBalancerURL = 'http://52.8.16.173:9000/iptables';

export default runSiege = (volume) {

  cmd.get(`siege ${loadBalancerURL} -c${volume} > siegelog.txt`, data => console.log(`Siege data ${data}`));

};

// Path of siege.log (for future reference)
// /usr/local/var/siege.log
