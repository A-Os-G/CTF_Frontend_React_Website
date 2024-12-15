import {useRef, useLayoutEffect, useState} from 'react';

function GetElementDimensions({kid}) {

    const ref = useRef(null);

    const [width,setWidth] = useState(0);
    const [height,setHeight] = useState(0);

    useLayoutEffect(() => {
        setWidth(ref.current.offsetWidth);
        setHeight(ref.current.offsetHeigh)
    }, []);

    if(width < 200){
        return ( 
            <div  className={"card-Title nooverflow"}>
                <h1 ref={ref}>{kid}</h1>
                {/* <p>{width}</p> */}

            </div>
        );

    }else{
        return ( 
            <div  className={"card-Title overflowing"}>
                <h1 ref={ref}>
                    {kid}
                </h1>
                {/* <p>{width}</p> */}
            </div>
         );
    }

}

export default GetElementDimensions;
