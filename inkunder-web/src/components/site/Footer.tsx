import Link from "next/link";
export default function Footer() {
  return (
    <footer className="border-b border-r border-l">
      <div className="w-full flex flex-row justify-between py-3 px-4 ">
        <div className="flex flex-col">
          <h1>INK UNDER SKIN</h1>
          <p>Hey there! We're Ink Under Skin,
            and we've been turning skin into awesome art since 2013!
            Whether you want a tiny butterfly or a full dragon sleeve, our artists can literally do it all.
            Come hang out with us and let's create something amazing together!</p>
        </div>
        <div className="py-7">
          <Link href='/gallery' ><h1>Gallery</h1></Link>
        </div>
      </div>
    </footer>
  );
}
