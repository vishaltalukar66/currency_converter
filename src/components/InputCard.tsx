import { useEffect, useState } from "react";

export const InputCard = () => {
    const [currenciesList, setCurrenciesList] = useState<String[]>([]);
    const [from, setFrom] = useState('inr');
    const [to, setTo] = useState('usd');
    const [inputValue, setInputValue] = useState<string>('');
    const [finalValue, setFinalValue] = useState<number>(0);

    const swap = () => {
        const temp = from;
        setFrom(to);
        setTo(temp);
    }

    const computeValue = async () => {


        const currentRate = await fetch(`https://cdn.jsdelivr.net/gh/fawazahmed0/currency-api@1/latest/currencies/${from}/${to}.json`).then((res) => {
            return res.json();
        }).then((val) => {
            const rate = val[`${to}`];
            return rate;
        })

        const inputVal = Number(inputValue); //string to number
        setFinalValue(inputVal * currentRate); //calculate total value

    }

    useEffect(() => {
        fetch('https://cdn.jsdelivr.net/gh/fawazahmed0/currency-api@1/latest/currencies.json').then((res) => {
            return res.json();
        }).then((val) => {
            const keys = Object.keys(val);
            setCurrenciesList(keys);
        })

    }, [])


    return (
        <>

            <div className='bg-white p-5 rounded-lg'>
                <div className='flex grid-cols-4  space-x-6 text-lg'>
                    <div className='grid gap-2 '>
                        <div className=''>
                            Amount
                        </div>
                        <div>
                            <input type="number" className=' w-20 text-lg rounded-xl -m-1 px-3 py-1 focus:outline-none focus:ring focus:ring-blue-400 focus:bg-blue-100 bg-slate-100' placeholder='$' value={inputValue}
                                onChange={(e) => {
                                    setInputValue(e.target.value);
                                }}
                            />
                        </div>
                    </div>
                    {/* from */}
                    <div className='grid gap-2 '>
                        <div className=''>
                            From
                        </div>
                        <div>
                            <select name="from" id="from" className=' w-20 text-lg rounded-xl -m-1 px-1 py-1 focus:outline-none focus:ring focus:ring-blue-400 focus:bg-blue-100 bg-slate-100' value={from}
                                onChange={(e) => {
                                    setFrom(e.target.value);
                                }}

                            >

                                {
                                    currenciesList.map((curr) => {
                                        return (
                                            <option value={curr as string} key={curr as string}> {curr.toUpperCase()}</option>
                                        );
                                    })
                                }
                            </select>
                        </div>
                    </div>
                    {/* swap  */}
                    <div className='grid gap-2 '>
                        <div> </div>
                        <div className='mt-6'>
                            <button className='bg-blue-600 rounded-xl p-1 text-sm text-white' onClick={swap}><i className="fa fa-retweet" aria-hidden="true" />
                            </button>
                        </div>
                    </div>
                    {/* to */}
                    <div className='grid gap-2 '>
                        <div className=''>
                            To
                        </div>
                        <div>
                            <select name="to" id="to" className=' w-20 text-lg rounded-xl -m-1 px-1 py-1 focus:outline-none focus:ring focus:ring-blue-400 focus:bg-blue-100 bg-slate-100' value={to}
                                onChange={(e) => {
                                    setTo(e.target.value);
                                }}


                            >
                                {
                                    currenciesList.map((curr) => {
                                        return (
                                            <option value={curr as string} key={curr as string}> {curr.toUpperCase()}</option>
                                        );
                                    })
                                }
                            </select>
                        </div>
                    </div>

                </div>




                <div className='text-center mt-8'><button className='bg-blue-600 rounded-xl p-1 w-52 text-xl text-white' onClick={computeValue}>Convert</button></div>
                {/* display final value */}
                <div className=" mt-8 text-2xl">
                    {`${from.toUpperCase()} to ${to.toUpperCase()} = `}

                    {finalValue}
                </div>
            </div>
        </>
    );
}