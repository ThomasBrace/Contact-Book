import React from 'react';

export default class Content extends React.Component { //child of AppContainer
  constructor() {
    super();
    this.state = {
      isEditing: false
    }
  }

  _handleClickRemove() {
    this.props.removeContact(this.props.selectedContact);
  }

  _handleSubmit(){
    event.preventDefault();
    this.setState({
      //toggle editing mode to opposite previous
      isEditing: !this.state.isEditing
    });
    //build array of updated values
    const updtedContact = {
      id: this.props.selectedContact.id, //need to incriment for new contacts
      name: document.getElementById("name").value,
      phone: document.getElementById("phone").value,
      address: document.getElementById("address").value,
      notes: document.getElementById("notes").value,
      Quote: ""
    };
    //update parent state
    this.props.updateContact(updtedContact);
  }

  render() {
    let contactInfo = "";
    let pageHeader = this.props.selectedContact.name !== "" ? this.props.selectedContact.name : "New Contact"; //set page title for new contacts
    let buttonText = this.props.selectedContact.name !== "" ? "Update" : "Add Contact";
    if(this.props.isEditing) {
      contactInfo =
          <div className="col-xs-10">
            <form id="editContact" key={this.props.selectedContact.id}>
              <h1 className="page-header">{pageHeader}</h1>
              <div className="form-group form-group-lg">
                <label for="name" className="col-form-label">Name:</label>
                <input type="text" id="name" className="form-control" placeholder="Name" defaultValue={this.props.selectedContact.name} />
              </div>
              <div className="form-group form-group-lg">
                <label for="phone" className="col-form-label">Phone Number:</label>
                <input type="text" id="phone" className="form-control" placeholder="phone" defaultValue={this.props.selectedContact.phone} />
              </div>
              <div className="form-group form-group-lg">
                <label for="address" className="col-form-label">Address:</label>
                <button type="locate" className="btn btn-default">Here</button>
                <textarea type="text" id="address" className="form-control" placeholder="address" rows="3" defaultValue={this.props.selectedContact.address} />
              </div>
              <div className="form-group form-group-lg">
                <label for="notes" className="col-form-label">Notes:</label>
                <textarea type="text" id="notes" className="form-control" placeholder="notes" rows="3" defaultValue={this.props.selectedContact.notes} />
              </div>
              <div className="form-group form-group-lg">
                <button type="Update" className="btn btn-default" onClick={this._handleSubmit.bind(this)}>{buttonText}</button>
              </div>
            </form>
          </div>;
    } else {
      contactInfo =
        <div className="col-xs-10">
          <h1 className="page-header">{this.props.selectedContact.name}</h1>
          <h3 className="sub-header">{this.props.selectedContact.phone}</h3>
          <h6 className="sub-header">{this.props.selectedContact.address}</h6>
          <h6 className="sub-header">{this.props.selectedContact.notes}</h6>
        </div>;
    }

    return(
      <div>
        <div className="row">
          {contactInfo}
          <h1>
            <div className="col-xs-2 btn-group" role="group">
              <button type="button" className="btn btn-default" aria-label="Left Align" onClick={this.props.toggleEditing} >
                <span className="glyphicon glyphicon-pencil" aria-hidden="true"></span>
              </button>
              <button type="button" className="btn btn-default" aria-label="Left Align" onClick={this._handleClickRemove.bind(this)}>
                <span className="glyphicon glyphicon-trash" aria-hidden="true"></span>
              </button>
            </div>
          </h1>
        </div>
      </div>
    );
  }
}
