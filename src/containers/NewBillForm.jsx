import React from 'react'
import { connect } from 'react-redux'

import { Creators } from '../actions';

class NewBillForm extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      newBill: null
    }
  }

  updateNewBill(name, value) {
    this.setState({
      newBill: {
        ...this.state.newBill,
        [name]: value
      }
    })
  }

  handleCreate(e) {
    e.preventDefault()
    this.props.addBill(this.state.newBill)
    this.setState({ newBill: null })
  }

  render() {
    const { newBillEditing, setNewBillEditing } = this.props
    
    const { newBill } = this.state

    return (
      <div>
        
        <button onClick={() => setNewBillEditing(!newBillEditing) }>
          {!newBillEditing ? 'New Bill +' : 'x'}
        </button>

        {newBillEditing ?
          <form onSubmit={(e) => this.handleCreate(e) }>
            <p>
              <input
                placeholder="Bill Name"
                type="text"
                onChange={e => this.updateNewBill('name', e.target.value)}
              />
            </p>

            <p>
              <input
                placeholder="Bill Owner"
                type="text"
                onChange={e => this.updateNewBill('flatmateOwner', e.target.value)}
              />
            </p>

            <p>
              <input
                placeholder="Bill Price"
                type="number"
                onChange={e => this.updateNewBill('price', e.target.value)}
              />
            </p>

            <p>
              <input
                placeholder="Split between?"
                type="text"
                onChange={e => {
                  const split = e.target.value.split(',').map( Number )
                  this.updateNewBill('originalSplit', split)
                  this.updateNewBill('remainingSplit', split)
                }}
              />
            </p>

            <p>
              <input
                placeholder="Date Due"
                type="text"
                onChange={e => this.updateNewBill('dateDue', e.target.value)}
              />
            </p>


            <p>
              Already paid? 
              <input
                type="checkbox"
                onChange={e => this.updateNewBill('complete', !this.state.newBill.complete)}
              />
            </p>

            {newBill && newBill.complete ?
              <p>
                <input
                  placeholder="Date Paid"
                  type="text"
                  onChange={e => this.updateNewBill('datePaid', e.target.value)}
                />
              </p>
              : null
            }


            <button type="submit">Add bill +</button>
          </form>
          : null
        }
      </div>
      
    )
  }
}

const mapDispatchToProps = dispatch => ({
  setNewBillEditing: (editing) => dispatch(Creators.setNewBillEditing(editing)),
  addBill: (newBill) => dispatch(Creators.addBill(newBill))
})

const mapStateToProps = (state, ownProps) => ({
  latestBills: state.bills.latestBills,
  newBillEditing: state.bills.newBillEditing
})

export default connect(mapStateToProps, mapDispatchToProps)(NewBillForm)