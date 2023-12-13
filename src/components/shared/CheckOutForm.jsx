/* eslint-disable react/prop-types */
import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js";
import { useEffect, useState } from "react";
import useAuth from "./useAuth";
import useAxios from "./useAxios";

const CheckOutForm = ({ rowData, refetch, closeModal }) => {
  const { user, handleAlert } = useAuth();
  const axiosSecure = useAxios();
  const [error, setError] = useState("");
  const [clientSecret, setClientSecret] = useState("");

  const [loading, setLoading] = useState(false);
  const stripe = useStripe();
  const elements = useElements();

  const price = parseInt(rowData?.price?.replace(/,/g, ""), 10);
  useEffect(() => {
    axiosSecure
      .post(`/payment?email=${user?.email}`, {
        price: price,
      })
      .then((res) => {
        setClientSecret(res.data.clientSecret);
      });
  }, [axiosSecure, price, user?.email]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    if (!stripe || !elements) {
      return;
    }

    const card = elements.getElement(CardElement);

    if (card === null) {
      return;
    }
    const { error, paymentMethod } = await stripe.createPaymentMethod({
      type: "card",
      card,
    });
    if (error) {
      console.log("payment error", error);
      setError(error.message);
    } else {
      console.log("payment method", paymentMethod);
      setError("");
    }

    // confirm card payment
    const { paymentIntent, error: confirmError } =
      await stripe.confirmCardPayment(clientSecret, {
        payment_method: {
          card: card,
          billing_details: {
            email: user?.email || "anonymous",
            name: user?.displayName || "anonymous",
          },
        },
      });
    if (confirmError) {
      setError(confirmError.message);
    } else {
      console.log("payment intent", paymentIntent);
      if (paymentIntent.status === "succeeded") {
        handleAlert(
          "success",
          `Payment Successful. Transaction ID: ${paymentIntent.id}`
        );
        const status = {
          status: "Paid",
        };
        axiosSecure
          .put(
            `/assigned-bookings/${rowData?._id}?email=${user?.email}`,
            status
          )
          .then((res) => {
            if (res.status === 201) {
              refetch();
              closeModal();
            }
          })
          .catch((error) => {
            console.log(error);
          });
      }
    }
    setLoading(false);
  };
  return (
    <div>
      <form onSubmit={handleSubmit}>
        <CardElement
          options={{
            style: {
              base: {
                fontSize: "16px",
                color: "#424770",
                "::placeholder": {
                  color: "#aab7c4",
                },
              },
              invalid: {
                color: "#9e2146",
              },
            },
          }}
        ></CardElement>
        {/* <button
          className="btn bg-rose mt-4"
          type="submit"
          disabled={!stripe}
          onClick={handleSubmit}
        >
          Pay
        </button> */}
        <p className="text-red-600 text-center mt-4">{error}</p>

        <div className="text-center my-8">
          <button
            className="btn text-white bg-lime-600"
            type="submit"
            disabled={!stripe || !clientSecret}
          >
            {loading ? "Processing..." : `PAY $${rowData?.price}`}
          </button>
        </div>
      </form>
    </div>
  );
};

export default CheckOutForm;
