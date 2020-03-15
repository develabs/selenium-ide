// Licensed to the Software Freedom Conservancy (SFC) under one
// or more contributor license agreements.  See the NOTICE file
// distributed with this work for additional information
// regarding copyright ownership.  The SFC licenses this file
// to you under the Apache License, Version 2.0 (the
// "License"); you may not use this file except in compliance
// with the License.  You may obtain a copy of the License at
//
//   http://www.apache.org/licenses/LICENSE-2.0
//
// Unless required by applicable law or agreed to in writing,
// software distributed under the License is distributed on an
// "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
// KIND, either express or implied.  See the License for the
// specific language governing permissions and limitations
// under the License.

import { codeExport as exporter } from '@seleniumhq/side-utils'

const emitters = {
  afterAll,
  afterEach,
  beforeAll,
  beforeEach,
  declareDependencies,
  declareVariables,
  inEachBegin: empty,
  inEachEnd: empty,
}

function generate(hookName, exportObject) {
  return new exporter.hook(emitters[hookName](exportObject))
}

export function generateHooks(exportObject) {
  let result = {}
  Object.keys(emitters).forEach(hookName => {
    result[hookName] = generate(hookName, exportObject)
  })
  return result
}

function afterAll() {
  return {}
}

function afterEach() {
  return {}
}

function beforeAll() {
  return {}
}

function beforeEach() {
  return {}
}

function declareDependencies(exportObject) {
  const params = {
    startingSyntax: {
      commands: [
        {
          level: 0,
          statement:
            `package ${(exportObject &&
              exportObject.additionalOpts &&
              exportObject.additionalOpts.package) ||
              'com.jedox.qa.default'}` + ';',
        },
        {
          level: 0,
          statement:
            'import com.jedox.qa.engines.testng_web.framework.testexec.Loader;',
        },
        { level: 0, statement: 'import org.testng.annotations.Test;' },
        { level: 0, statement: 'import static org.testng.Assert.*;' },
        { level: 0, statement: 'import org.testng.ITestContext;' },
        { level: 0, statement: 'import static org.hamcrest.CoreMatchers.is;' },
        { level: 0, statement: 'import static org.hamcrest.core.IsNot.not;' },
        { level: 0, statement: 'import static org.hamcrest.MatcherAssert.*;' },
        { level: 0, statement: 'import org.openqa.selenium.By;' },
        { level: 0, statement: 'import org.openqa.selenium.WebDriver;' },
        {
          level: 0,
          statement: 'import org.openqa.selenium.firefox.FirefoxDriver;',
        },
        {
          level: 0,
          statement: 'import org.openqa.selenium.chrome.ChromeDriver;',
        },
        { level: 0, statement: 'import org.openqa.selenium.Dimension;' },
        { level: 0, statement: 'import org.openqa.selenium.WebElement;' },
        {
          level: 0,
          statement: 'import org.openqa.selenium.interactions.Actions;',
        },
        {
          level: 0,
          statement:
            'import org.openqa.selenium.support.ui.ExpectedConditions;',
        },
        {
          level: 0,
          statement: 'import org.openqa.selenium.support.ui.WebDriverWait;',
        },
        {
          level: 0,
          statement: 'import org.openqa.selenium.JavascriptExecutor;',
        },
        { level: 0, statement: 'import org.openqa.selenium.Alert;' },
        { level: 0, statement: 'import org.openqa.selenium.Keys;' },
        { level: 0, statement: 'import java.util.*;' },
      ],
    },
  }
  return params
}

function declareVariables() {
  const params = {
    startingSyntax: {
      commands: [
        {
          level: 0,
          statement: 'private Map<String, Object> vars = new HashMap<>();',
        },
      ],
    },
  }
  return params
}

function empty() {
  return {}
}