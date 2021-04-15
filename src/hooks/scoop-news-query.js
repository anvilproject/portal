import {useStaticQuery, graphql} from 'gatsby';

export const ScoopNewsStaticQuery = () => {
    const {allMarkdownRemark} = useStaticQuery(
        graphql`
        query ScoopNewsStaticQuery {
          allMarkdownRemark(filter: {denied: {eq: false}, fields: {slug: {regex: "/news/", ne: "/news/news"}}}, sort: {fields: [frontmatter___date], order: DESC}) {
            edges {
              node {
                denied
                fields {
                   slug
                }
                frontmatter {
                   date(formatString: "MMMM DD, YYYY")
                   description
                   featured
                   title
                }
                htmlAst
              }
            }
          }
        }
    `
    );
    return allMarkdownRemark.edges
        .map(e => e.node)
        .map(n => n)
        .filter(n => n.fields.slug.startsWith("/news/"));
};
