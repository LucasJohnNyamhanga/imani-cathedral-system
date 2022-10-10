/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  images: {
		domains: ['database.co.tz', 'kkktimani.org', '127.0.0.1', ],
	},
}

module.exports = nextConfig
