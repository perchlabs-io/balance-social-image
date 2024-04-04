import { ImageResponse } from '@vercel/og';
import { NextRequest } from 'next/server';
 
export const config = {
  runtime: 'edge',
};
 
export default async function handler(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
 
    // ?title=<title>
    const hasTitle = searchParams.has('title');
    const title = hasTitle
      ? searchParams.get('title')?.slice(0, 100)
      : 'Balance Analytics';

    const fontData = await fetch(
        new URL('../../assets/Roboto-Regular.ttf', import.meta.url),
    ).then((res) => res.arrayBuffer());
 
    return new ImageResponse(
      (
        <div
          style={{
            //backgroundColor: 'black',
            backgroundImage: 'linear-gradient(to bottom, #00040f, #060F27 )',
            //backgroundSize: '150px 150px',
            height: '100%',
            width: '100%',
            display: 'flex',
            textAlign: 'center',
            alignItems: 'center',
            justifyContent: 'center',
            flexDirection: 'column',
            flexWrap: 'nowrap',
          }}
        >
          <div
            style={{
              fontSize: 70,
              //fontStyle: 'normal',
              fontFamily: '"Roboto"',
              letterSpacing: '-0.025em',
              color: '#52ffeb',
              marginTop: 30,
              padding: '0 10px',
              lineHeight: 1.4,
              whiteSpace: 'pre-wrap',
            }}
          >
            {title}
          </div>
          <div
            style={{
              height: '275'
            }}
          >
          </div>
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              justifyItems: 'center',
            }}
          >
            <img
              alt="Balance"
              height={45}
              src="https://dclgnjbi9pxjaanf.public.blob.vercel-storage.com/ba_logo_64.png"
              //style={{ margin: '0 30px' }}
              width={45}
            />


            <div
            style={{
              fontSize: 30,
              //fontStyle: 'normal',
              fontFamily: '"Roboto"',
              letterSpacing: '-0.025em',
              color: '#52ffeb',
              //marginTop: 30,
              padding: '0 20px',
              lineHeight: 1.4,
              whiteSpace: 'pre-wrap',
            }}
          >
            Balance Analytics
          </div>
          </div>
          
        </div>
      ),
      {
        width: 1200,
        height: 630,
        fonts: [
            {
              name: 'Roboto',
              data: fontData,
              style: 'normal',
            },
          ],
      },
    );
  } catch (e: any) {
    console.log(`${e.message}`);
    return new Response(`Failed to generate the image`, {
      status: 500,
    });
  }
}