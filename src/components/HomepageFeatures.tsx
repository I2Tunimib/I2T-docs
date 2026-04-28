import React from 'react';
import clsx from 'clsx';
import Link from '@docusaurus/Link';
import styles from './HomepageFeatures.module.css';
import modification from '../../static/img/modification.png'
import reconciliation from '../../static/img/reconciliation.png'
import matchingRevision from '../../static/img/matching-revision.png'
import extension from '../../static/img/extension.png'
import generativeAI from '../../static/img/generativeAI.png'
import automaticAnnotation from '../../static/img/automatic-annotation.png'
import compliance from '../../static/img/compliance.png'
import visualization from '../../static/img/visualization.png'
import pipelineGeneration from '../../static/img/pipeline-generation.png'

type FeatureItem = {
  title: string;
  image: string;
  to: string;
  description: JSX.Element;
};

const FeatureList: FeatureItem[] = [
  {
    title: 'Modification',
    image: modification,
    to: '/user-manual/enrichment-workflow/modification',
    description: (<>Prepare your data for enrichment by applying transformation functions.</>),
  },
  {
    title: 'Reconciliation',
    image: reconciliation,
    to: '/user-manual/enrichment-workflow/reconciliation',
    description: (<>Link your table cells to external Knowledge Bases, such as Wikidata or GeoNames.</>),
  },
  {
    title: 'Matching Revision',
    to: '/user-manual/enrichment-workflow/matching-revision',
    image: matchingRevision,
    description: (<>Validate and correct candidate entities at cell level or through batch refinement and propagation across columns.</>),
  },
  {
    title: 'Extension',
    to: '/user-manual/enrichment-workflow/extension',
    image: extension,
    description: (<>Enrich your table by fetching additional properties and metadata from reconciled entities.</>),
  },
  {
    title: 'Generative AI',
    to: '/user-manual/enrichment-workflow/generative-ai',
    image: generativeAI,
    description: (<>Leverage Large Language Models to assist in AI-driven modification, reconciliation, and extension.</>),
  },
  {
    title: 'Automatic Annotation',
    to: '/user-manual/exploring-interface/toolbar/automatic-annotation',
    image: automaticAnnotation,
    description: (<>Automatically annotate either the full table (Semantic Table Interpretation) or classify the column schema (NER).</>),
  },
  {
    title: 'Compliance Check',
    to: '/user-manual/exploring-interface/toolbar/compliance',
    image: compliance,
    description: (<>Evaluate the current state of your table's compliance against different privacy standards and legal regulations.</>),
  },
  {
    title: 'Visualization',
    to: '/user-manual/exploring-interface/toolbar/visualization',
    image: visualization,
    description: (<>Explore your data through interactive Table, Raw (JSON), and Graph-based visualizations.</>),
  },
  {
    title: 'Enrichment Pipeline Generation',
    to: '/user-manual/exploring-interface/toolbar/export',
    image: pipelineGeneration,
    description: (<>Export your enrichment process into reproducible pipelines to execute the same workflow on full-scale tables.</>),
  },
];

function Feature({title, image, to, description}: FeatureItem) {
  return (
    <div className={clsx('col col--4')}>
      <Link to={to} className={styles.featureCard}>
        <div className="text--center">
          <h3>{title}</h3>
          <p>{description}</p>
        </div>
        <div className="text--center">
          <img
            src={image}
            alt={title}
            style={{ width: 'auto' }}
          />
        </div>
      </Link>
    </div>
  );
}

export default function HomepageFeatures(): JSX.Element {
  return (
    <div>
      <h1 className="text--center">Main Features</h1>
      <section className={styles.features}>
        <div className="container">
          <div className="row">
            {FeatureList.map((props, idx) => (
              <Feature key={idx} {...props} />
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
