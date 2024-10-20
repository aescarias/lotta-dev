<?xml version="1.0" encoding="utf-8"?>
<xsl:stylesheet version="3.0" xmlns:xsl="http://www.w3.org/1999/XSL/Transform" xmlns:xpfn="http://www.w3.org/2005/xpath-functions">
    <xsl:output method="html" version="5.0" encoding="UTF-8" indent="yes" />
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
                @media (prefers-color-scheme: light) {
                    :root {
                        --clr-accent: hsl(212, 82%, 43%);
                        --clr-bg: hsl(231, 15%, 86%);
                        --clr-fg: hsl(0, 0%, 0%);
                        --clr-fg-second: hsl(221, 14%, 25%);
                        --clr-card: hsl(231, 30%, 82%);
                    }
                }
                
                @media (prefers-color-scheme: dark) {
                    :root {
                        --clr-accent: hsl(202, 62%, 53%);
                        --clr-bg: hsl(231, 20%, 7%);
                        --clr-fg: hsl(0, 0%, 100%);
                        --clr-fg-second: hsl(221, 14%, 61%);
                        --clr-card: hsl(231, 21%, 12%);
                    }
                }
                
                html {
                    background-color: var(--clr-bg);
                }

                body {
                    font-family: "Source Code Pro", monospace;
                    font-size: 1.2rem;
                    margin: 2em;
                    color: var(--clr-fg);
                }

                a {
                    color: var(--clr-accent);
                    text-decoration: none;
                }

                a:hover { 
                    text-decoration: underline; 
                }

                .header {
                    display: flex;
                    justify-content: space-between;
                    align-items: center;
                    gap: 2em;
                }

                .header .brand {
                    color: var(--clr-accent); 
                    font-weight: bold;
                    flex-shrink: 0;
                }

                .rss-notice {
                    background-color: var(--clr-card);
                    padding: 1em;
                }
                .rss-notice p { 
                    margin-block: 0.75em; 
                }

                .articles {
                    display: flex;
                    gap: 1em;
                    flex-direction: column;
                    margin-block: 1em;
                }

                .articles .post {
                    display: flex;
                    background-color: var(--clr-card);
                    gap: 2em;
                    padding: 0.25em 1em;
                    align-items: center;
                }
            
                .articles .post h3 { 
                    margin-block: 0.5em; 
                }
                .articles .post .post-detail { 
                    color: var(--clr-fg-second); 
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
                        This is an <a href="https://aboutfeeds.com/">RSS feed</a> meant for feed readers and 
                        aggregators. Copy the URL from the address bar into your favorite reader and enjoy 
                        the freedom of web syndication!
                    </p>
                </header>    

                <main>
                    <section class="articles">
                        <h2>posts</h2>

                        <xsl:for-each select="/rss/channel/item">
                            <article class="post">
                                <time>
                                    <xsl:attribute name="datetime">
                                        <xsl:value-of select="pubDate" />
                                    </xsl:attribute>
                                    
                                    <!-- I don't like this hack but most browsers barely support XSLT 1.0, let alone 2.0 -->
                                    <xsl:value-of select="substring(pubDate, 5, 12)" />
                                </time>

                                <div>
                                    <h3>
                                        <a target="_blank" rel="noopener noreferrer">
                                            <xsl:attribute name="href">
                                                <xsl:value-of select="link" />
                                            </xsl:attribute>
    
                                            <xsl:value-of select="title" />
                                        </a>
                                    </h3>
    
                                    <p>
                                        <xsl:value-of select="description" />
                                    </p>
                                </div>
                            </article>
                        </xsl:for-each>
                    </section>
                </main>

                <footer>
                    © 2023. Angel Carias.
                    <a href="/about#legal">license</a> ·
                    <a href="https://github.com/aescarias/lotta-dev" target="_blank" rel="noopener noreferrer">
                        github
                    </a>
                </footer>
            </body>
        </html>
    </xsl:template>
</xsl:stylesheet>
