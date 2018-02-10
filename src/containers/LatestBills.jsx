import React from 'react'
import { connect } from 'react-redux'

import { Creators } from '../actions';

import { Name, Price } from '../components'

const LatestBills = ({ latestBills, flatmates, onBillDelete, onToggleSegmentPaid }) => {
  return (
    <ul>
      {latestBills && latestBills.map((bill) => {
        return (
          <li key={bill.id}>
            <h3>
              {bill.name}
              &nbsp;
              Total:
              <Price total={bill.price} />
              &nbsp;
              Transferred:
              <Price total={!bill.segmentsIsPaid ? bill.segmentsCurrentBalance : bill.price} />

              <button type="button" onClick={() => onBillDelete(bill.id)}>
                &times;
              </button>
            </h3>

            {bill.segments.map(segment => {
              const { firstName, lastName } = flatmates[segment.flatmateId]

              return (
                <p key={segment.flatmateId} style={{ textDecoration: segment.isPaid ? 'line-through' : 'none' }}>
                  <Name firstName={firstName} lastName={lastName} />
                  &nbsp;
                  <Price total={segment.price} />
                  &nbsp;
                  <button onClick={() => onToggleSegmentPaid(bill.id, segment.flatmateId)}>
                    {segment.isPaid ? '×' : '✓'}
                  </button>
                </p>
              )
            })}

          </li>
        )
      })}
    </ul>
  )
}

const mapDispatchToProps = dispatch => ({
  onBillDelete: (billId) => dispatch(Creators.deleteBill(billId)),
  onToggleSegmentPaid: (billId, flatmateId) => dispatch(Creators.toggleSegmentPaid(billId, flatmateId))
});

const mapStateToProps = (state, ownProps) => ({
  latestBills: state.bills.latestBills,
  flatmates: state.flatmates
})

export default connect(mapStateToProps, mapDispatchToProps)(LatestBills)