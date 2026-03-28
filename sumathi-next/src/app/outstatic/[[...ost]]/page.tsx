import 'outstatic/outstatic.css'
import { Outstatic } from 'outstatic'
import { OstClient } from 'outstatic/client'

export default async function Page({
  params
}: {
  params: Promise<{ ost: string[] }>
}) {
  const resolvedParams = await params;
  const ostData = await Outstatic();
  return <OstClient ostData={ostData} params={resolvedParams} />
}
