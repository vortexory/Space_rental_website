import useCountries from './hooks/useCountries';
import countries from 'world-countries';


export default function Home() {
  const { getAll, getByValue } = useCountries();
  const data = getAll();
  return (
    <div className="text-rose-400">
      hello
      <pre>{JSON.stringify(data, null, 2)}</pre>
    </div>
  );
}
