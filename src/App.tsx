import Header from './Header';
import Scoreboard from './Scoreboard';

export default function App() {
  const sid = window.localStorage.getItem('sid');
  const sidSig = window.localStorage.getItem('sid.sig');
  if (!sid || !sidSig)
    return (
      <div className="bg-black h-full min-h-screen w-screen">
        <div
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2
          text-white border-2 border-white p-2"
        >
          <form>
            <input
              className="bg-black text-white border-2 border-white p-2 w-96"
              type="text"
              name="sid"
              placeholder="sid"
            />
            <br />
            <input
              className="bg-black mt-2 text-white border-2 border-white p-2 w-96"
              type="text"
              name="sid.sig"
              placeholder="sid.sig"
            />
            <br />
            <input
              onClick={(ev) => {
                ev.preventDefault();
                const sid = (
                  document.querySelector(
                    'input[name="sid"]',
                  ) as HTMLInputElement
                ).value;
                const sidSig = (
                  document.querySelector(
                    'input[name="sid.sig"]',
                  ) as HTMLInputElement
                ).value;
                window.localStorage.setItem('sid', sid);
                window.localStorage.setItem('sid.sig', sidSig);
                window.location.reload();
              }}
              className="bg-black mt-2 text-white border-2 border-white p-2"
              type="submit"
              value="登录"
            />
          </form>
        </div>
      </div>
    );

  return (
    <div className="h-full min-h-screen w-screen bg-black">
      <Header />
      <Scoreboard />
    </div>
  );
}
