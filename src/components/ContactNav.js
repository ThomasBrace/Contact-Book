import React from 'react';

export default class ContactNav extends React.Component { //child of AppContainer
  constructor() {
    super();
    this.state = {
      filter: null
    }
  }

  render() {
    const contacts = this._getContacts() || [];
    return(
      <div>
        <div className="form-group form-group-lg add-button">
          <button type="button" className="btn btn-default" onClick={this.props.addContact}>
            Add Contact&nbsp;
            <span className="glyphicon glyphicon-plus" aria-hidden="true"></span>
            <span className="glyphicon glyphicon-user" aria-hidden="true"></span>
          </button>
        </div>
        <div className="form-group form-group-lg filter">
          <input id="contactsFilter" type="text" className="form-control" onChange={this._filterContacts.bind(this)} placeholder="Search for..." />
        </div>
        <ul className="nav nav-sidebar">
          {contacts}
        </ul>
      </div>
    );
  }

  _handleClick(obj){
    event.preventDefault();
    this.props.updateSelectedContact(obj);
  }

  _filterContacts(event) {
    this.setState({
      filter: event.target.value
    });
  }


  _getContacts() {
    let filter = this.state.filter;
    if (filter != null && filter.length > 0){
      filter = filter.toUpperCase() //convert to upper case to match cases.
      return this.props.contactsList
        .filter(function(entry){
          return entry.name.toUpperCase().indexOf(filter) != -1;  //test against filter
        })
        .map((i) => { // build new arry of results
          return (
            <li key={i.id}>
                <a href="#" key={i.id} onClick={() => this._handleClick(i) }>
                {i.name}
              </a>
            </li>
          );
        });
    } else {
      return this.props.contactsList.map((i) => {
        return (
          <li key={i.id}>
              <a href="#" key={i.id} onClick={() => this._handleClick(i) }>
              {i.name}
            </a>
          </li>
        );
      });
    }
  }

}
