module.exports = {
  main: async function (event, context) {
    let waitTime = between(100, 3000); 
    console.log(`Will wait ${waitTime}`);
    let promise = new Promise((resolve, reject) => {
      setTimeout(() => {
        resolve(`Hi! Resolved after ${waitTime}!`);
      }, waitTime)
    })
    
    return await promise;
  },
};



function between(min, max) {
  return Math.floor(Math.random() * (max - min) + min);
}
