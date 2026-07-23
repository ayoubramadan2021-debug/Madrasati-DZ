# طريقة العمل

## قبل أي تعديل

```bash
cd /data/data/com.termux/files/home/madrasati-dz
git status --short
cp -p <file> <file>.bak_$(date +%Y%m%d_%H%M%S)
```

## البناء

```bash
npm run build
```

## المعاينة

```bash
npm run dev -- --host 0.0.0.0 --port 5173
```

## الرفع الآمن

```bash
git add -- <files>
git diff --cached --check
git diff --cached --name-status
git commit -m "<message>"
git push -u origin <branch>
```
