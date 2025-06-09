# CV source and rebuild

The public CV is generated from `Yasin_Dehfouli_CV.tex`. The TeX source stays outside `public/`; only the compiled PDF is served by the website.

From the repository root, install [Tectonic](https://tectonic-typesetting.github.io/) and run:

```sh
tectonic --outdir public/documents documents/cv/Yasin_Dehfouli_CV.tex
```

This writes `public/documents/Yasin_Dehfouli_CV.pdf`. LaTeX is a maintainer-only tool and is not required by the Next.js development server, production build, or deployment environment.

After rebuilding, verify that the PDF remains one page, its text is selectable, and the email, telephone, LinkedIn, GitHub, employer, publication, and DOI links are active.
