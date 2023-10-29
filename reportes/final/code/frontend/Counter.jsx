import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { motion } from "framer-motion";
import { counterActions } from "../store/counter-slice";

const Counter = () => {
  const dispatch = useDispatch();
  const counter = useSelector((state) => state.counter.counter);
  const show = useSelector(state => state.counter.show)

  const incrementHandler = () => {
    dispatch(counterActions.increment());
  };

  const toggleHandler = () => {
    dispatch(counterActions.toggleCounter())
  }
  const addHandler = (amount, miniAmount) => {
    dispatch(counterActions.increase({amount: amount, miniAmount: miniAmount}))
  }

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
      <div className="bg-white h-72 flex items-center flex-col gap-4 justify-evenly">
        <h1 className="text-xl font-bold text-red-900 text-center">Counter</h1>
        {show && <p className="text-2xl text-red-900">{counter}</p>}
        <button
          className="bg-red-900 px-6 py-2 rounded-lg text-white"
          onClick={incrementHandler}
        >
          Increment
        </button>
        <button
          className="bg-red-900 px-6 py-2 rounded-lg text-white"
          onClick={toggleHandler}
        >
          { !show ?  'show' : 'hide'}
        </button>
        <button
          className="bg-red-900 px-6 py-2 rounded-lg text-white"
          onClick={addHandler.bind(null, 5, .1)}
        >
          ADD
        </button>
      </div>
    </motion.div>
  );
};

export default Counter;
