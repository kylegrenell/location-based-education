var Question = require('./question');

var Quiz = function(params){
  if ( typeof( params ) === 'string' ) {
    this.title = params;
    this.questions = [];
    this.published = false;
  }
  else {
    this.title = params.title;
    this.questions = params.questions;
    this.published = params.published;
  }
}

Quiz.prototype = {
  addQuestion: function( text, countryCode, countryName, archived ) {
    var question = new Question({
      text: text,
      answer: {
        countryCode: countryCode,
        countryName: countryName
      },
      archived: archived
    });
    this.questions.push( question );
  },
  isSaveable: function() {
    if ( !this.title ) {
      return false;
    }
    if ( this.questions.length === 0 ) {
      return false;
    }
    if( !this.areQuestionsAllSaveable() ) {
      return false;
    }
    return true;
  },
  areQuestionsAllSaveable: function() {
    return this.questions.every( function(question) {
      return question.isSaveable();
    });
  }
};

module.exports = Quiz;