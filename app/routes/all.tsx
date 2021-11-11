import * as React from "react";
import type { Week } from ".prisma/client";
import format from "date-fns/format";
import { MetaFunction, ActionFunction, LoaderFunction, useLoaderData, useTransition } from "remix";
import { Layout } from "~/components/Layout";
import { prisma } from "~/lib/prisma.server";
import { Modal } from "~/components/Modal";
import { WeekForm } from "~/components/WeekForm";
import { Link } from "react-router-dom";
import { ArrowLeft, ArrowRight } from "react-bootstrap-icons";

export const meta: MetaFunction = () => ({
  title: "All weeks",
});

export const loader: LoaderFunction = async () => {
  const weeks = await prisma.week.findMany();

  return weeks;
};

export const action: ActionFunction = async ({ request }) => {
  const method = request.method.toUpperCase();

  const body = new URLSearchParams(await request.text());

  if (method === "PUT") {
    const earnings = body.get("earnings");
    const hours = body.get("hours");
    const start = body.get("start");
    const days = body.get("days");
    const id = body.get("week_id");

    if (!id || !earnings || !hours || !start) {
      // todo
      return null;
    }

    const week = await prisma.week.findUnique({
      where: { id },
    });

    if (!week) {
      return null;
    }

    const updated = await prisma.week.update({
      where: { id },
      data: {
        earnings: parseFloat(earnings),
        hours: parseFloat(hours),
        start: new Date(start),
        days: days ? parseInt(days) : 1,
      },
    });

    return updated;
  }
};

export default function All() {
  const form = useTransition();
  const data = useLoaderData<Week[]>();

  const [open, setOpen] = React.useState(false);
  const [tempWeek, setTempWeek] = React.useState<Week | null>(null);

  React.useEffect(() => {
    if (form.state === "loading") {
      setOpen(false);
    }
  }, [form.state]);

  return (
    <Layout>
      <Link className="flex items-center gap-4 mb-3" to="/">
        <ArrowLeft /> <p>Return Home</p>
      </Link>

      <h1 className="mb-3 text-2xl font-semibold">All weeks</h1>

      <div className="w-full mt-3 overflow-x-auto">
        <table className="w-full overflow-hidden whitespace-nowrap max-h-64">
          <thead>
            <tr>
              <th># Week</th>
              <th>Earnings</th>
              <th>Hours</th>
              <th>Days</th>
              <th>Start</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {data.map((week, idx) => (
              <tr key={week.id}>
                <td>{idx + 1}</td>
                <td>{week.earnings}</td>
                <td>{week.hours}</td>
                <td>{week.days}</td>
                <td>{format(new Date(week.start), "yyyy-MM-dd")}</td>
                <td className="w-36">
                  <button
                    onClick={() => {
                      setOpen(true);
                      setTempWeek(week);
                    }}
                    className="p-1 px-3 transition-colors bg-green-500 rounded-md hover:bg-green-600"
                  >
                    Edit
                  </button>
                  <button className="p-1 px-3 ml-2 transition-colors bg-red-500 rounded-md hover:bg-red-600">
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <Modal
        title="Edit Week"
        isOpen={open}
        onClose={() => {
          setOpen(false);
          setTimeout(() => setTempWeek(null), 100);
        }}
      >
        <WeekForm data={tempWeek} />
      </Modal>
    </Layout>
  );
}
