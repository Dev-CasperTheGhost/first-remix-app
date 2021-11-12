import * as React from "react";
import type { Week } from ".prisma/client";
import { Form, useTransition } from "remix";

export const WeekForm = ({ data }: { data: Week | null }) => {
  const ref = React.useRef<HTMLFormElement>(null);
  const { state } = useTransition();
  const isDisabled = state !== "idle";

  React.useEffect(() => {
    if (state === "loading") {
      ref.current?.reset();
    }
  }, [state]);

  return (
    <Form ref={ref} method={data ? "put" : "post"}>
      {!data ? <h1 className="mb-3 text-3xl font-bold">Add week data</h1> : null}

      {data ? (
        <input name="week_id" id="week_id" className="hidden" defaultValue={data.id} />
      ) : null}

      <fieldset className="flex flex-col mb-3">
        <label htmlFor="hours" className="mb-1">
          Hours
        </label>
        <input
          defaultValue={data?.hours}
          min={0}
          id="hours"
          name="hours"
          className="p-1.5 px-3 border-[1.5px] rounded-md border-gray-400"
        />
      </fieldset>

      <fieldset className="flex flex-col mb-3">
        <label htmlFor="earnings" className="mb-1">
          Earnings
        </label>
        <input
          defaultValue={data?.earnings}
          min={0}
          id="earnings"
          name="earnings"
          className="p-1.5 px-3 border-[1.5px] rounded-md border-gray-400"
        />
      </fieldset>

      <fieldset className="flex flex-col mb-3">
        <label htmlFor="days" className="mb-1">
          Days
        </label>
        <input
          defaultValue={data?.days}
          type="number"
          id="days"
          name="days"
          className="p-1.5 px-3 border-[1.5px] rounded-md border-gray-400"
        />
      </fieldset>

      <fieldset className="flex flex-col mb-3">
        <label htmlFor="start" className="mb-1">
          Start
        </label>
        <input
          defaultValue={
            data?.start ? new Date(data.start.toString()).toISOString().slice(0, 10) : undefined
          }
          type="date"
          id="start"
          name="start"
          className="p-1.5 px-3 border-[1.5px] rounded-md border-gray-400"
        />
      </fieldset>

      <button
        disabled={isDisabled}
        className="p-1.5 px-3 rounded-md transition-colors bg-gray-300 hover:bg-gray-400 disabled:opacity-50 disabled:cursor-not-allowed"
        type="submit"
      >
        {isDisabled ? "loading..." : !data ? "Add week" : "Save"}
      </button>
    </Form>
  );
};
