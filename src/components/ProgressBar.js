export default function ProgressBar(props) {
  const Progress = (props.raiseCurrent * 100) / props.raiseGoal;

  return (
    <>
      <div className="relative pt-1">
        <div className="flex mb-2 items-center justify-between">
          <div className="text-black font-bold text-sm">Raise Progress:</div>
          <div className="text-right">
            <span className="text-xs font-semibold inline-block text-black">
              {props.raiseGoal > 10000
                ? `${Math.round(props.raiseGoal / 1000)}K`
                : props.raiseGoal}{' '}
              XRPL
            </span>
          </div>
        </div>
        <div className="mx-3">
          <div className="h-5 w-full rounded-md bg-pink-200 text-xs text-center align-text-bottom">
            <div
              style={{ width: `${Progress}%` }}
              className={`h-full rounded-md bg-pink-500`}
            ></div>
          </div>
        </div>
      </div>
    </>
  );
}
