import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { motion } from "framer-motion";
import { counterActions } from "../store/counter-slice";

const CounterDecrement = () => {
  const dispatch = useDispatch();
  const counter = useSelector((state) => state.counter.counter);

  const decrementHandler = () => {
    dispatch(counterActions.decrement());
  };

  return (
    <motion.div 
    initial={{
        opacity: 0,
        y: 100
    }}
    animate={{
        opacity: 1,
        y: 0
    }}
    transition={{
        ease: "easeInOut",
        duration: 0.5
    }}
    open
    className="w-96 bg-red-900 mx-auto rounded-md p-1 shadow-xl shadow-black/40">
      <div className="bg-white h-40 flex items-center flex-col gap-4 justify-evenly">
        <h1 className="text-xl font-bold text-red-900 text-center">Counter</h1>
        <p className="text-2xl text-red-900">{counter}</p>
        <button
          className="bg-red-900 px-6 py-2 rounded-lg text-white"
          onClick={decrementHandler}
        >
          Decrement
        </button>
      </div>
    </motion.div>
  );
};

export default CounterDecrement;
