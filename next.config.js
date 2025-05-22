/** @type {import('next').NextConfig} */
const nextConfig = {
	output: 'export',
	async headers() {
		return [
			{
				source: '/dishes.json',
				headers: [
					{
						key: 'Cache-Control',
						value: 'public, max-age=3600, stale-while-revalidate=60',
					},
				],
			},
		];
	},
};

module.exports = nextConfig;