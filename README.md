# yet-another-sub-web

![Website](https://img.shields.io/website?url=https%3A%2F%2Fs.mli.li&style=flat-square&label=Demo) ![Vercel](https://vercelbadge.vercel.app/api/missuo/yet-another-sub-web?style=flat-square&label=Vercel) ![GitHub License](https://img.shields.io/github/license/missuo/yet-another-sub-web?style=flat-square&label=License)

Yet another [sub-web](https://github.com/CareyWang/sub-web), a frontend implemented using React and Next.JS. It requires the [tindy2013/subconverter](https://github.com/tindy2013/subconverter) backend to handle subscription configuration conversions.

This is a modified version based on [DyAxy/yet-another-sub-web](https://github.com/DyAxy/yet-another-sub-web).

## Quick Deployment

### Using Vercel Service

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https%3A%2F%2Fgithub.com%2Fmissuo%2Fyet-another-sub-web&env=NEXT_PUBLIC_BACKENDS&envDescription=Set%20the%20required%20backend%20URL.%20Click%20Learn%20More%20for%20details.&envLink=https%3A%2F%2Fgithub.com%2Fmissuo%2Fyet-another-sub-web%2Fblob%2Fmaster%2F.env&project-name=yet-another-sub-web&repository-name=yet-another-sub-web)

### Using Docker Locally

**Deploy using `docker-compose`:**

```bash
curl -O compose.yaml https://raw.githubusercontent.com/missuo/yet-another-sub-web/master/compose.yaml
# You can modify the environment variables in compose.yaml
docker compose up -d
```

### Environment Variables

| Variable Name          | Description                                  | Example                     |
| ---------------------- | -------------------------------------------- | --------------------------- |
| `NEXT_PUBLIC_BACKENDS` | Full backend address(es), separated by `\|` | `http://127.0.0.1:25500/sub?` |

## Acknowledgements

- [DyAxy/yet-another-sub-web](https://github.com/DyAxy/yet-another-sub-web)
- [CareyWang/sub-web](https://github.com/CareyWang/sub-web)
- [tindy2013/subconverter](https://github.com/tindy2013/subconverter)
