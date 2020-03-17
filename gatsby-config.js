require('dotenv').config({
  path: `.env.${process.env.NODE_ENV}`,
});

module.exports = {
  siteMetadata: {
    title: `Attestation de déplacement dérogatoire`,
    description: `Générez votre attestation de déplacement durant la période de confinement suite au COVID-19 en quelques secondes seulement.`,
    author: `@monsieurRiz`,
  },
  plugins: [
    `gatsby-plugin-react-helmet`,
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `images`,
        path: `${__dirname}/src/images`,
      },
    },
    `gatsby-transformer-sharp`,
    `gatsby-plugin-sharp`,
    `gatsby-plugin-resolve-src`,
    `gatsby-plugin-styled-components`,
    {
      resolve: 'gatsby-plugin-matomo',
      options: {
        siteId: process.env.GATSBY_MATOMO_SITE_ID,
        matomoUrl: process.env.GATSBY_MATOMO_URL,
        siteUrl: process.env.GATSBY_MATOMO_SITE_URL,
        requireConsent: false,
      },
    },
    {
      resolve: `gatsby-plugin-manifest`,
      options: {
        name: `Attestation de déplacement dérogatoire`,
        start_url: `/`,
        background_color: `rgb(231,236,239)`,
        theme_color: `rgb(107,179,223)`,
        display: `minimal-ui`,
        icon: `src/images/favicon.png`, // This path is relative to the root of the site.
      },
    },
    // this (optional) plugin enables Progressive Web App + Offline functionality
    // To learn more, visit: https://gatsby.dev/offline
    // `gatsby-plugin-offline`,
  ],
};
