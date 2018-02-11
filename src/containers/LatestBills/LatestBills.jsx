import React from 'react'
import { connect } from 'react-redux'

import { Creators } from '../../actions';

import { DeleteBtn, BillPrice, BillSegment, BillTitle } from '../../components'

const LatestBills = ({ latestBills, flatmates, onBillDelete, onToggleSegmentPaid }) => {
  return (
    <ul className="uk-list uk-list-large">
      {latestBills && latestBills.map((bill) => {
        return (
          <li key={bill.id} className="uk-margin-top uk-margin-bottom">
            <BillTitle title={bill.name} />

            <div className="uk-display-inline-block">

            {!bill.segmentsIsPaid ?
              <div className="uk-display-inline-block">
                <BillPrice
                  className="uk-label uk-label-danger"
                  total={bill.price}
                />

                &nbsp;

                <BillPrice
                  className="uk-label uk-label-warning"
                  total={!bill.segmentsIsPaid ? bill.segmentsCurrentBalance : bill.price}
                />
              </div>
            :
              <span className="uk-label uk-label-success">Paid</span>
            }
              &nbsp;
              <DeleteBtn
                onDelete={() => onBillDelete(bill.id)}
              />
            </div>

            <ul className="uk-list uk-padding-remove-left">
              {bill.segments.map(segment => {
                const { firstName, lastName } = flatmates[segment.flatmateId]

                return <BillSegment {...{
                  key: segment.flatmateId,
                  firstName,
                  lastName,
                  segment,
                  onToggleSegmentPaid: e => {
                    e.preventDefault()
                    onToggleSegmentPaid(bill.id, segment.flatmateId)
                  }
                }} />

              })}
            </ul>

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