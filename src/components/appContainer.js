import React from 'react';
import ContactNav from './ContactNav';
import Content from './Content';

export default class AppContainer extends React.Component { //parent Component
  constructor() {
    super();

    this.state = {
      contactsList: [
        {id:this._generateUID(), name: 'Tom Brace', phone: '0123456789', address:'fg dfgh dfgh dfgh dfgh', notes: 'sdfdsfasdfasdf asdf as df asdf  sadf a sdfasdf', Quote:''},
        {id:this._generateUID(), name: 'Kyle Barclay', phone: '0123456789', address:'fg dfgh dfgh dfgh dfg', notes: 'sdfdsfasdfasdf asdf as df asdf  sadf a sdfasdf', Quote:''},
        {id:this._generateUID(), name: 'Burt Lancaster', phone: '0123456789', address:'fg dfgh dfgh dfgh dfg', notes: 'sdfdsfasdfasdf asdf as df asdf  sadf a sdfasdf', Quote:''},
        {id:this._generateUID(), name: 'Jeannie Kyler', phone: '0123456789', address:'fg dfgh dfgh dfgh dfg', notes: 'sdfdsfasdfasdf asdf as df asdf  sadf a sdfasdf', Quote:''},
        {id:this._generateUID(), name: 'Ursella Phyllida', phone: '0123456789', address:'fg dfgh dfgh dfgh dfg', notes: 'sdfdsfasdfasdf asdf as df asdf  sadf a sdfasdf', Quote:''},
        {id:this._generateUID(), name: 'John Smith', phone: '0123456789', address:'fg dfgh dfgh dfgh dfg', notes: 'sdfdsfasdfasdf asdf as df asdf  sadf a sdfasdf', Quote:''},
        {id:this._generateUID(), name: 'Dave Johnson', phone: '0123456789', address:'fg dfgh dfgh dfgh dfg', notes: 'sdfdsfasdfasdf asdf as df asdf  sadf a sdfasdf', Quote:''}
      ],
      selectedContact: {},
      isEditing: false
    }
  }

  componentDidMount() { //deafult to fist contact when app loads
      this._updateContact(this.state.contactsList[0]);
  }

  render(){
    return(
      <div className="container-fluid">
        <div className="row">
          <div id="sidebar" className="col-xs-12 col-md-3 sidebar">
            <ContactNav
              updateSelectedContact={this._updateContact.bind(this)}
              addContact={this._addContact.bind(this)}
              contactsList={this.state.contactsList}
            />
          </div>
          <div id="content" className="col-xs-12 col-md-9 main">
            <Content
              selectedContact={this.state.selectedContact}
              updateContact={this._updateContact.bind(this)}
              removeContact={this._removeContact.bind(this)}
              isEditing={this.state.isEditing}
              toggleEditing={this._toggleEditing.bind(this)}
            />
          </div>
        </div>
      </div>
    );
  };

  _toggleEditing() {
    event.preventDefault();
    this.setState({
      isEditing: !this.state.isEditing
    });
  }

  _generateUID() {
      var d = new Date().getTime();
      var uid = 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
          var r = (d + Math.random()*16)%16 | 0;
          d = Math.floor(d/16);
          return (c=='x' ? r : (r&0x3|0x8)).toString(16);
      });
      return uid;
  };

  _addContact(){
    const emptyContact = {
      id: this._generateUID(),
      name: '',
      phone: '',
      address:'',
      notes: '',
      Quote:''
    }
    this.state.contactsList.concat(emptyContact)
    this.setState({
      selectedContact: emptyContact,
      isEditing: true
    });
  }

  _updateContact(obj){
    var pos = this.state.contactsList.findIndex(x => x.id==obj.id) //find pos of item in array
    if (pos == -1) {pos = this.state.contactsList.length} //if it can't be found in the list then it must be a new entry
    this.state.contactsList.splice(pos,1,obj) // replace orignal
    this.state.contactsList.sort(function(a,b) {return (a.name.toUpperCase() > b.name.toUpperCase()) ? 1 : ((b.name.toUpperCase() > a.name.toUpperCase()) ? -1 : 0);} ); //sort list
    this.setState({
      selectedContact: obj
    });
  }

  _removeContact(obj){
    var pos = this.state.contactsList.findIndex(x => x.id==obj.id) //find pos of item in array
    this.state.contactsList.splice(pos,1) // replace orignal
    this.state.contactsList.sort(function(a,b) {return (a.name.toUpperCase() > b.name.toUpperCase()) ? 1 : ((b.name.toUpperCase() > a.name.toUpperCase()) ? -1 : 0);} ); //sort list
    this.setState({
      selectedContact: this.state.contactsList[0] //reset to 1st contact in list
    });
  }
}
