import Decimal from 'decimal.js-light';

export const GJNumberView = ({ pairData }: { pairData: any }) => {
    if (!pairData) return <div />;
    return (
        <div className='flex flex-wrap items-center justify-center'>
            {Object.keys(pairData).map((key: any) => {
                return <GJNumberLabel key={key} label={key} value={pairData[key]} />;
            })}
        </div>
    );
};

export const GJNumberLabel = ({ label, value }: { label: string; value: number }) => {
    const fixedValue = new Decimal(value).toFixed(1);

    return (
        <div className='border-white m-2 flex flex-col items-center justify-center rounded-xl border-2 p-2'>
            <div className='text-3xl font-bold'>{fixedValue}</div>
            <div className='text-xl font-bold capitalize'>{label}</div>
        </div>
    );
};
