const fibonacci = require ('fibonacci');
module.exports = {
    main: async function (event, context) {
      const dataIn = JSON.parse(event.data);
      let waitTime = between(100, 3000); 
      console.log(`Will wait ${waitTime}`);
      let promise = new Promise((resolve, reject) => {
        setTimeout(() => {
            var payload = {
                ...dataIn,
                waitTime,
                check_in: {
                  ...dataIn.check_in,
                  fun3: new Date()
              },
              fibo: {
                ...dataIn.fibo,
                fun3: fibonacci.iterate(between(parseInt(process.env['FIBONACCI_MIN'],10),parseInt(process.env['FIBONACCI_MAX'],10)))
              }
            };
            if(process.env['PUSH_EVENT_TYPE']){
                var eventOut=event.buildResponseCloudEvent(payload.uuid,process.env['PUSH_EVENT_TYPE'],payload);
                event.publishCloudEvent(eventOut);
                console.log(`Payload [${payload.uuid}] pushed to ${process.env['PUSH_EVENT_TYPE']}`,payload)
            }
            resolve(payload);
        }, waitTime)
      })
      
      return await promise;
    },
  };


  
  function between(min, max) {
    return Math.floor(Math.random() * (max - min) + min);
  }
  

  
