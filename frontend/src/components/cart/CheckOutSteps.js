import React from 'react'
import {Link} from 'react-router-dom'

const CheckOutSteps = ({shipping, confirmOrder, payment}) => {
    return (
        <div className="checkout-progress d-flex justify-content-center m5-5">
            {shipping ? <Link to='shipping' className="float-right">
                <div className="triangle2-active"></div>
                <div className="step active-step">Shipping</div>
                <div className="triangle-active"></div>
            </Link> : <Link to='#!' disabled>
            <div className="triangle2-incomplete"></div>
                <div className="step incomplete">Shipping</div>
                <div className="triangle-incomplete"></div>
            </Link>
            }
            {confirmOrder ? <Link to='/ordrer/confirm' className="float-right">
                <div className="triangle2-active"></div>
                <div className="step active-step">Confirm Order</div>
                <div className="triangle-active"></div>
            </Link> : <Link to='#!' disabled>
            <div className="triangle2-incomplete"></div>
                <div className="step incomplete"> Confirm Order </div>
                <div className="triangle-incomplete"></div>
            </Link>
            }
            {payment ? <Link to='/payment' className="float-right">
                <div className="triangle2-active"></div>
                <div className="step active-step"> payment </div>
                <div className="triangle-active"></div>
            </Link> : <Link to='#!' disabled>
            <div className="triangle2-incomplete"></div>
                <div className="step incomplete"> Payment </div>
                <div className="triangle-incomplete"></div>
            </Link>
            }
        </div>
    )
}

export default CheckOutSteps
