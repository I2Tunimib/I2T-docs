import React from 'react';
import Layout from '@theme/Layout';
import HomepageFeatures from '@site/src/components/HomepageFeatures';

export default function Home() {
  return (
    <Layout title="SemTUI">
      <main>
        <div style={{textAlign: 'center', margin: '3rem 0'}}>
          <h1 style={{fontSize: '3rem'}}>SemT-X</h1>
          <p style={{fontSize: '1.2rem'}}>
            A framework for the semantic enrichment of tabular data<br/>
            by linking cells and columns to external knowledge sources,
            adding context and additional information.
          </p>
        </div>

        <HomepageFeatures />

        <div style={{textAlign: 'center', margin: '2rem'}}>
          <p>
            And much more to discover in{' '}
            <a href="/I2T-docs/docs/backend/architecture">
              our documentation
            </a>
          </p>
        </div>
      </main>
    </Layout>
  );
}
