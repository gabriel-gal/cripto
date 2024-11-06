import React from "react";

const CustomTool = ({ payload }: any) => {
    if (payload && payload.length) {
        const value = payload[0].value;
        return (
            <div className="custom-tooltip bg-slate-100 p-1">
                <p className="price">
                    {new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(value)}
                </p>
            </div>
        );
    }
    return null;
}

export default CustomTool