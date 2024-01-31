<?xml version="1.0" encoding="utf-8"?>
<xsl:stylesheet version="3.0" xmlns:xsl="http://www.w3.org/1999/XSL/Transform">
    <xsl:output method="html" version="1.0" encoding="UTF-8" indent="yes" />
    <xsl:template match="/">
        <html xmlns="http://www.w3.org/1999/xhtml" lang="en">
            <head>
                <meta charset="UTF-8"/>
                <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
                <link rel="preconnect" href="https://fonts.googleapis.com"/>
                <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin="anonymous" />
                <link href="https://fonts.googleapis.com/css2?family=Source+Code+Pro" rel="stylesheet" />
                <title>Lotta Dev Web Feed</title>
            </head>

            <style>
                :root {
                    --accentColor: #3d9bd1;
                }

                body {
                    font-family: "Source Code Pro", monospace;
                    font-size: 1.2rem;
                    margin: 2em;
                    background: #edf2fc;
                }

                a {
                    color: var(--accentColor);
                    text-decoration: none;
                }
                a:hover { text-decoration: underline; }

                .header {
                    display: flex;
                    justify-content: space-between;
                    align-items: center;
                    gap: 2em;
                }
                .header .brand {
                    color: var(--accentColor); 
                    font-weight: bold;
                    flex-shrink: 0;
                }

                .rss-notice {
                    background-color: #E0E0E0;
                    padding: 1em;
                }
                .rss-notice p { margin-block: 0.75em; }

                .articles {
                    display: flex;
                    gap: 1em;
                    flex-direction: column;
                    margin-block: 1em;
                }
                .articles .post {
                    background-color: #d0d9dd;
                    padding: 0.5em 1em;
                }
                .articles .post h3 { margin-block: 0.5em; }
                .articles .post .post-detail { color: hsl(222, 14%, 40%); }
                
                @media (prefers-color-scheme: dark) {
                    body {
                        background: #0B151D;
                        color: white;
                    }
                    .rss-notice {
                        background-color: #212121;
                    }
                    .articles .post {
                        background-color: #1a1a1a;
                    }
                    .articles .post .post-detail {
                        color: #8e97aa;
                    }
                }
                @media screen and (max-width: 500px) {
                    .header { display: block; }
                }
            </style>

            <body>
                <header class="header">
                    <h1 class="brand">        
                        <a href="/">
                            <xsl:value-of select="/rss/channel/title" />
                        </a>
                    </h1>
                    
                    <p>
                        <xsl:value-of select="/rss/channel/description" />
                    </p>
                </header>

                <header class="rss-notice">
                    <p>
                        This is an <a href="https://aboutfeeds.com/">RSS feed</a>. It is meant for feed readers and aggregators.
                        Copy the URL from the address bar into your favorite feed reader and enjoy the freedom of web syndication!
                    </p>

                    <p>
                        This is an HTML version of the feed. Of course, RSS feeds are XML which you can view 
                        by inspecting the source. If you want to read the articles through the web, you probably 
                        want <a href="https://lotta.pages.dev">my website</a>.
                    </p>
                </header>    

                <main>
                    <section class="articles">
                        <h2>Latest posts</h2>

                        <xsl:for-each select="/rss/channel/item">
                            <article class="post">
                                <h3>
                                    <a target="_blank" rel="noopener noreferrer">
                                        <xsl:attribute name="href">
                                            <xsl:value-of select="link" />
                                        </xsl:attribute>

                                        <xsl:value-of select="title" />
                                    </a>
                                </h3>

                                <span class="post-detail">
                                    <time>
                                        <xsl:value-of select="pubDate" />
                                    </time>
                                </span>

                                <p>
                                    <xsl:value-of select="description" />
                                </p>
                            </article>
                        </xsl:for-each>
                    </section>
                </main>

                <footer>
                    © 2024. Angel Carias.
                    <a href="/about#legal">license</a> ·
                    <a href="https://github.com/aescarias/lotta-dev" target="_blank" rel="noopener noreferrer">
                        github
                    </a>
                </footer>
            </body>
        </html>
    </xsl:template>
</xsl:stylesheet>
