module.exports = {
  main: function (event, context) {
    return "Node JS is cool! Oh.. and BTW vendor is : "+process.env['vendor'];
  },
};
