import os.path

def test_sample_readme():
  f1=open(os.path.dirname(__file__) + '/../output.json',"r")
  f2=open(os.path.dirname(__file__) + '/../expected.output.json',"r")

  test_result = True

  for line1 in f1:
      for line2 in f2:
          test_result = test_result and (line1 == line2)
          break
  assert(test_result)

if __name__ == "__main__":
    test_sample_readme()
    print("Everything passed")

            