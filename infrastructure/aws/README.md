# Still Between Us AWS flow

## Interim authorization state

Until the signed artist and artwork authorization is uploaded and verified:

- CloudFront allows visitors only from India (`IN`) and the United Arab Emirates (`AE`).
- The deployment workflow publishes `aws-site/interim.html`, not the promotional page.
- The interim response contains no Spotify player, track links, artwork, analytics, or promotional tracking.
- Search engines receive `noindex` directives and `robots.txt` disallows crawling.
- No promotion or sitemap submission should run.

After authorization is verified, the geo restriction and interim workflow must be changed through a reviewed commit before the full SEO export is deployed.

This deployment is isolated from the other Secrix sites.

- Source branch: `initial_branch`
- Public domain: `https://stillbetweenus.secrix.org`
- Origin: a dedicated, private, versioned S3 bucket
- Delivery: a dedicated CloudFront distribution with IPv6, HTTP/2 and HTTP/3, compression, WAF, HTTPS, and an interim India/UAE allowlist
- DNS and TLS: the existing Secrix Route 53 zone and wildcard ACM certificate
- Continuous delivery: GitHub Actions authenticates through an immutable repository-ID and branch-restricted AWS OIDC role; no long-lived AWS access keys are stored in GitHub

The CloudFormation stack is named `stillbetweenus-seo`. Pushes to `initial_branch` build and test the static SEO export, synchronize it to S3, and invalidate CloudFront. `main` and `develop` are not deployment branches.
