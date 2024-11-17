import './Scoreboard.css';

import { PDict, UDict } from './lib/interface';

import Score from './Score';
import reactDOMServer from 'react-dom/server';
import request from './lib/request';
import { useEffect } from 'react';
import { useRequest } from 'alova/client';

type ScoreboardTdUser = {
  type: 'user';
  value: string; // user name
  raw: number; // user id
};

type ScoreboardTdRank = {
  type: 'rank';
  value: string; // a number or "*"
};

type ScoreboardTdTotalScore = {
  type: 'total_score';
  value: number;
};

type ScoreboardTdRecord = {
  type: 'record';
  value: string;
  raw: string; // record id
  style?: string; // a style for this column
};

type ScoreboardTdProblem = {
  type: 'problem';
  value: string;
  raw: number; // pid
};

type ScoreboardTd =
  | ScoreboardTdUser
  | ScoreboardTdRank
  | ScoreboardTdTotalScore
  | ScoreboardTdRecord
  | ScoreboardTdProblem;

const TableTr = ({ tr, index, udict }: { tr: ScoreboardTd[]; index: number; udict: UDict }) => {
  return (
    <tr
      id={tr[1].value.toString()}
      className="atr absolute flex -left-[1px] right-0"
      style={{ top: `${32 * index}px` }}
    >
      {tr.map((td, index) => {
        switch (td.type) {
          case 'rank':
            return (
              <td className="w-10 border-1 text-center" key="rank">
                {td.value}
              </td>
            );
          case 'user':
            return (
              <td className="border-1 grow" key="user">
                {udict[td.raw].displayName}
              </td>
            );
          case 'total_score':
            return (
              <td className="w-20 border-1 text-center" key="totalScore">
                {td.value}
              </td>
            );
          case 'record':
            return (
              <td className="w-60 border-1 text-center" key={`record-${index}`}>
                <Score score={td.value} />
              </td>
            );
        }
      })}
    </tr>
  );
};

const ScoreboardPlain = ({
  rows,
  pdict,
  udict,
}: {
  rows: ScoreboardTd[][];
  pdict: PDict;
  udict: UDict;
}) => {
  return (
    <table className="w-full [&_td]:p-1 [&_th]:p-1 relative">
      <thead>
        <tr>
          {rows[0].map((td) => {
            switch (td.type) {
              case 'rank':
                return (
                  <th className="w-10 border-1" key={td.value}>
                    #
                  </th>
                );
              case 'user':
                return (
                  <th className="border-1" key={td.value}>
                    {td.value}
                  </th>
                );
              case 'total_score':
                return (
                  <th className="w-20 border-1" key={td.value}>
                    总得分
                  </th>
                );
              case 'problem':
                return (
                  <th className="w-60 border-1" key={td.value}>
                    {pdict[td.raw].pid || `#${pdict[td.raw].docId}`}.
                    {pdict[td.raw].title}
                  </th>
                );
            }
          })}
        </tr>
      </thead>
      <tbody className="relative">
        {rows.slice(1).map((tr, index) => (
          <TableTr udict={udict} tr={tr} index={index} key={tr[1].value} />
        ))}
      </tbody>
    </table>
  );
};

const BackToSelectButton = () => {
  return (
    <button
      className="absolute bottom-2 right-2 z-50 bg-black text-white border-2 border-white p-2"
      onClick={() => {
        window.localStorage.removeItem('tid');
        window.location.reload();
      }}
    >
      重选比赛
    </button>
  );
};

export default function Scoreboard() {
  const tid = window.localStorage.getItem('tid');
  const { data, loading, send } = useRequest(
    request.Get<{ rows: ScoreboardTd[][]; pdict: PDict; udict: UDict }>(
      `/contest/${tid}/scoreboard`,
    ),
    {
      initialData: { rows: [[]], pdict: {}, udict: {} },
    },
  );
  useEffect(() => {
    const i = setInterval(async () => {
      if (loading) return;
      const { rows, udict } = await request.Get<{
        rows: ScoreboardTd[][];
        pdict: PDict;
        udict: UDict;
      }>(`/contest/${tid}/scoreboard`);
      const oldRank = data.rows.map((i) => i[1].value);
      const newRank = rows.map((i) => i[1].value);
      if (JSON.stringify(rows) !== JSON.stringify(data.rows)) {
        for (const i in oldRank) {
          const uname = oldRank[i];
          const e = document.getElementById(uname.toString());
          if (!e) continue;
          e.innerHTML = reactDOMServer.renderToString(
            <TableTr
              key={uname}
              tr={rows[newRank.indexOf(uname)]}
              index={newRank.indexOf(uname)}
              udict={udict}
            />,
          );
          if (newRank.indexOf(uname) < oldRank.indexOf(uname))
            e.style.backgroundColor = '#b45309';
          e.style.top = `${32 * (Number(newRank.indexOf(uname)) - 1)}px`;
        }
        setTimeout(() => {
          send();
        }, 1500);
      }
    }, 2000);
    return () => clearInterval(i);
  }, [data]);
  return (
    <div className="text-white mx-10">
      <ScoreboardPlain
        key={JSON.stringify(data.rows)}
        rows={data.rows || []}
        pdict={data.pdict}
        udict={data.udict}
      />
      <BackToSelectButton />
    </div>
  );
}
