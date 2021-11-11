import { Week } from ".prisma/client";
import { ActionFunction, LoaderFunction, useLoaderData } from "remix";
import { WeekForm } from "~/components/WeekForm";
import { Layout } from "~/components/Layout";
import { WeeksData } from "~/components/WeeksData";
import { prisma } from "~/lib/prisma.server";

export const loader: LoaderFunction = async () => {
  const weeks = await prisma.week.findMany();

  return weeks;
};

export const action: ActionFunction = async ({ request }) => {
  const body = new URLSearchParams(await request.text());

  const earnings = body.get("earnings");
  const hours = body.get("hours");
  const start = body.get("start");
  const days = body.get("days");

  console.log({ earnings, hours, start });

  if (!earnings || !hours || !start) {
    // todo
    return null;
  }

  const week = await prisma.week.create({
    data: {
      earnings: parseFloat(earnings),
      hours: parseFloat(hours),
      start: new Date(start),
      days: days ? parseInt(days) : 1,
    },
  });

  return week;
};

export default function Index() {
  const data = useLoaderData<Week[]>();

  console.log(data);

  return (
    <Layout>
      <WeekForm data={null} />
      <WeeksData />
    </Layout>
  );
}
