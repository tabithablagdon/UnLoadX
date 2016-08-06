import cmd from 'node-cmd';

/**
 * function runSiege - runs siege test and logs response time for each request in siegelog.txt
 *
 * @param  {[STRING]} URL     [url to run siege test]
 * @param  {[INTEGER]} volume [number of concurrent users]
 */
export default runSiege = (url, volume) {

  cmd.get(`siege ${url} -c${volume} > siegelog.txt`, data => console.log(`Siege data ${data}`));

};

// Path of siege.log (for future reference)
// /usr/local/var/siege.log
