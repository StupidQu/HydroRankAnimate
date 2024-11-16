import Divider from './Divider';
import { TDoc } from './lib/interface';
import request from './lib/request';
import { useRequest } from 'alova/client';

export default function Header() {
  const tid = window.localStorage.getItem('tid');
  const { data, loading } = useRequest(() => request.Get<{ tdoc: TDoc }>(`/contest/${tid}`));
  return (
    <div className="pt-2 pb-2 text-white w-screen">
      <div className="m-auto w-max pb-1"><h1 className="text-xl font-bold">{!loading && data.tdoc.title}</h1></div>
      <Divider />
    </div>
  );
}