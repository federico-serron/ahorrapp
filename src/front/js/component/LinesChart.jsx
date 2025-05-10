import React, { useEffect, useContext, useState } from "react";
import { LineChart, Line, CartesianGrid, XAxis, YAxis } from 'recharts';

const LinesChart = () => {

const data = [{name: 'Page A', uv: 400, pv: 200, amt: 2400}, {name: 'Page B', uv: 200, pv: 200, amt: 200}, {name: 'Page c', uv: 500, pv: 600, amt: 2200}];

    return (
        <LineChart width={800} height={300} data={data} margin={{ top: 5, right: 20, bottom: 5, left: 0 }}>
            <Line type="monotone" dataKey="uv" stroke="#8884d8" />
            <CartesianGrid stroke="#ccc" strokeDasharray="5 5" />
            <XAxis dataKey="name" />
            <YAxis dataKey="pv" />
        </LineChart>
    );
}

export default LinesChart;