import { GitHubIcon, LinkedInIcon, TwitterIcon } from '@/icons';
import Link from 'next/link';

const Header = () => {
  return (
    <>
      <header className="fixed top-0 flex w-full justify-center bg-night px-4 pt-2">
        <div
          id="header-container"
          className="flex w-full max-w-7xl flex-col flex-wrap items-center lg:flex-row"
        >
          <Link href="/" className="p-2 hover:rounded-md hover:bg-neutral-900">
            <h1 className="h-full align-middle font-mono font-medium text-[#95A3B3]">
              officialdavidtaylor.com
            </h1>
          </Link>
          <p className="mx-auto select-none font-mono text-[#4B4E6D]">
            in pursuit of excellence
          </p>
          <div className="flex justify-end p-2">
            <GitHubIcon href="https://github.com/officialdavidtaylor" />
            <TwitterIcon href="https://twitter.com/moderate_david" />
            <LinkedInIcon href="https://www.linkedin.com/in/david-allen-taylor/" />
          </div>
        </div>
        <hr className="border-[#95A3B3]" />
      </header>
    </>
  );
};

export default Header;
