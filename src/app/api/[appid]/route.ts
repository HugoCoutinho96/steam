export async function GET(request: Request, { params }: { params: Promise<{ appid: string }> }) {
  const {appid} = await params;
  const steamRes = await fetch(`https://store.steampowered.com/api/appdetails?appids=${appid}&cc=br&l=pt`);
  const data = await steamRes.json();

  return new Response(JSON.stringify(data), {
    headers: { 'Content-Type': 'application/json' }
  });
}