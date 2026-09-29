import { writeFile, mkdir } from 'fs/promises';
import { join } from 'path';

const paths = [
  'basis/intro/',
  'basis/install/',
  'basis/devtools/',
  'basis/component-way/',
  'basis/site-layout/',
  'basis/component-result/',
  'jsx/intro/',
  'jsx/returning/nested/',
  'jsx/returning/down/',
  'jsx/returning/several/',
  'jsx/returning/unclosed/',
  'jsx/returning/empty/',
  'jsx/variables/inserting/',
  'jsx/variables/nuances/',
  'jsx/variables/arrays/',
  'jsx/variables/objects/',
  'jsx/variables/attributes/',
  'jsx/tags/intro/',
  'jsx/tags/several/',
  'jsx/tags/multi-line/',
  'jsx/tags/return/',
  'jsx/tags/closing/',
  'jsx/tags/correctness/',
  'jsx/running-code/',
  'conditions/intro/',
  'conditions/show/',
  'conditions/return/',
  'conditions/ternary/',
  'conditions/logical-and/',
  'conditions/inverting/',
  'functions/intro/',
  'functions/tags-calling/',
  'functions/handlers/',
  'functions/handlers-params/',
  'functions/event-object/',
  'functions/event-object-params/',
  'forming/tags-array/',
  'forming/loop-tags-array/',
  'forming/tags-array-data/',
  'forming/array-keys/',
  'forming/array-of-objects/',
  'forming/unique-keys-id/',
  'forming/table/',
  'id/intro/',
  'id/problem/',
  'id/random-strings/',
  'id/generation/',
  'id/function/',
  'id/function-using/',
  'id/function-wrong-using/',
  'states/intro/',
  'states/using/',
  'states/reactivity/',
  'states/boolean-value/',
  'states/counter/',
  'forms/input/intro/',
  'forms/input/output/',
  'forms/input/function/',
  'forms/input/several/',
  'forms/data/',
  'forms/textarea/',
  'forms/checkbox/intro/',
  'forms/checkbox/conditional-rendering/',
  'forms/select/intro/',
  'forms/select/array/',
  'forms/select/value/',
  'forms/select/array-value/',
  'forms/radio/',
  'forms/default-values/',
  'forms/array-inputs-binding/',
  'forms/object-inputs-binding/',
  'data/intro/',
  'data/array-adding/',
  'data/array-operations/',
  'data/objects-array-adding/',
  'data/objects-array-operations/',
  'data/showing/',
  'components/intro/',
  'components/using/',
  'components/multiple-instances/',
  'components/props/',
  'components/child/',
  'components/child-array/',
  'components/child-loop/',
  'components/passing-states/',
  'components/passing-id/',
  'components/changing-parent-state/',
  'components/editing-parent-state/',
  'components/editing-grandparent-state/',
  'components/modes-via-states/',
  'concepts/intro/',
  'concepts/data/',
  'concepts/components-types/',
  'concepts/data-flow/',
  'concepts/lifting-state-up/',
  'concepts/truth-one-source/',
  'styling/intro/',
  'styling/global-css/',
  'styling/object-to-style/',
  'styling/common-file-to-style/',
  'styling/styles-in-style/',
  'styling/variables-to-style/',
  'styling/styled-components/',
  'styling/styled-components-props/',
  'styling/styled-components-conditional/',
  'styling/styled-components-extending/',
  'styling/css-modules-start/',
  'styling/css-modules-finish/',
  'styling/css-modules-composes-styles/',
  'styling/css-modules-composes-files/',
  'project/checklist/',
  'project/notepad/',
];

const mapToPascalCase = (paths) => {
  const pascalCasePaths = [];

  for (const path of paths) {
    let result = '';

    for (let i = 0; i < path.length; i++) {
      let char = path[i];

      if (char === '/' || char === '-') {
        continue;
      }

      if (i === 0 || path[i - 1] === '/' || path[i - 1] === '-') {
        result += char.toUpperCase();
        continue;
      }

      result += char;
    }

    pascalCasePaths.push(result);
  }

  return pascalCasePaths;
};

// 2. Функция-шаблон для содержимого файла
const getTemplate = (filename) => {
  return `function ${filename}() {
  return <div>${filename}</div>;
}

export default ${filename};
`;
};

async function createStructures(filesToCreate) {
  const baseDir = join(process.cwd(), 'output'); // Корневая папка для результата

  try {
    const creationPromises = filesToCreate.map(async (name, index) => {
      // Создаем путь к персональной папке: output/user-service/
      const number = String(index + 1).padStart(3, '0');

      const fileName = `${number}-${name}`;

      const itemFolder = join(baseDir, fileName);

      // Создаем путь к файлу внутри этой папки: output/user-service/user-service.js
      const filePath = join(itemFolder, `${fileName}.jsx`);
      const content = getTemplate(name);

      // 3. Создаем конкретную папку для этого элемента
      await mkdir(itemFolder, { recursive: true });

      // 4. Записываем файл внутрь созданной папки
      await writeFile(filePath, content, 'utf8');
      console.log(
        `✅ Создана папка и файл: output/${fileName}/${fileName}.jsx`,
      );
    });

    await Promise.all(creationPromises);
    console.log('\n🎉 Все персональные папки и файлы успешно созданы!');
  } catch (error) {
    console.error('❌ Произошла ошибка:', error);
  }
}

async function createIndexFile(filesToCreate) {
  const baseDir = join(process.cwd(), 'output');
  const indexFilePath = join(baseDir, 'paths-list.txt'); // Имя и формат файла можно изменить (например, .md или .js)

  try {
    // Гарантируем, что корневая папка 'output' существует
    await mkdir(baseDir, { recursive: true });

    // Формируем содержимое файла: каждый элемент с новой строки
    const content = filesToCreate
      .map((item, index) => {
        const fileName = `${String(index + 1).padStart(3, '0')}-${item}`;
        return `import ${item} from './exercises/${fileName}/${fileName}';`;
      })
      .join('\n');

    // Записываем файл
    await writeFile(indexFilePath, content, 'utf8');
    console.log(`✅ Создан общий файл со списком путей: output/paths-list.txt`);
  } catch (error) {
    console.error('❌ Ошибка при создании файла со списком:', error);
  }
}

// Корректный запуск обеих операций последовательно
async function main() {
  const pascalCaseNames = mapToPascalCase(paths);

  // Запускаем параллельно создание структуры и создание отдельного файла
  await Promise.all([
    createStructures(pascalCaseNames),
    createIndexFile(pascalCaseNames),
  ]);
}

main();
