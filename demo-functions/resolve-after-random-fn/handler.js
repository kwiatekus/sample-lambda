const fibonacci = require ('fibonacci');
module.exports = {
    main: async function (event, context) {
      let waitTime = between(100, 3000); 
      console.log(`Will wait ${waitTime}`);
      let promise = new Promise((resolve, reject) => {
        setTimeout(() => {
            var payload = {
                ...event.data,
                waitTime,
                check_in: {
                  ...event.data.check_in,
                  fun1: true
              },
              fibo: {
                ...event.data.fibo,
                fun1: fibonacci.iterate(between(parseInt(process.env['FIBONACCI_MIN'],10),parseInt(process.env['FIBONACCI_MAX'],10)))
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
  

  